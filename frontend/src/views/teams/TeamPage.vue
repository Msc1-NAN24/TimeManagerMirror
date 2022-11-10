<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { getTeam } from "@/services/team";
import { useAuthStore } from "@/store/AuthStore";
import { onMounted, ref } from "vue";
import { ITeam } from "@/dto/team";
import TeamMembersList from "@/components/teams/TeamMembersList.vue";
import EditTeamModal from "@/components/modals/teams/EditTeamModal.vue";
import DeleteTeamModal from "@/components/modals/teams/DeleteTeamModal.vue";
import { useToast } from "vue-toast-notification";
import AverageDailyChart, {
  UserWorkingTime,
} from "@/components/charts/AverageMonthlyChart.vue";
import { DateTime } from "luxon";
import workingTimeService from "@/services/workingTimes";
import { IWorkingTime } from "@/dto/workingTime";
const route = useRoute();
const auth = useAuthStore();

enum ModalType {
  Edit,
  DeleteTeam,
}

const router = useRouter();
const toast = useToast();

const team = ref<undefined | ITeam>(undefined);
const open = ref<undefined | ModalType>(undefined);
const times = ref<UserWorkingTime[]>([]);
const selectedWindowDays = ref(30);
const startingDay = ref(0);

const loadTeam = (teamId: string) => {
  getTeam(auth.accessToken, teamId, (teams, error) => {
    if (error) {
      console.log(error);
      toast.error("Une erreur est survenue ! #1300");
    } else if (teams !== undefined) {
      team.value = teams;
      loadWorkingTimes(teams.id);
    }
  });
};

const loadWorkingTimes = (id: string) => {
  const now = DateTime.now().setLocale("fr");
  const monthStart = now.startOf("month");
  const monthEnd = now.endOf("month");
  const weekStart = now.startOf("week");
  const weekEnd = now.endOf("week");

  startingDay.value = weekStart.day;
  selectedWindowDays.value = monthEnd.day;

  workingTimeService.getTeamWorkingTimesByPeriod(
    id,
    `${monthStart.toFormat("yyyy-MM-dd")} 00:00:00`,
    `${monthEnd.toFormat("yyyy-MM-dd")} 00:00:00`,
    (workingTimes) => {
      const usersWorkingTimes: UserWorkingTime[] = [];
      workingTimes.forEach((wt) => {
        let uwt = usersWorkingTimes.find((a) => a.user.id === wt.user.id);
        if (!uwt) {
          usersWorkingTimes.push({ times: [wt], user: wt.user });
        } else {
          uwt.times.push(wt);
        }
      });
      times.value = usersWorkingTimes;
    }
  );
};

onMounted(() => {
  loadTeam(route.params["id"] as any);
});

const onDismissModal = () => {
  open.value = undefined;
};

const onTeamEdited = (newTeam: ITeam) => {
  loadTeam(team.value["id"]);
  toast.success("Votre team à bien été modifié");
  open.value = undefined;
};

const onTeamDeleted = (newTeam: ITeam) => {
  toast.success("Votre team à bien été supprimé");
  open.value = undefined;
  router.push({ name: "teams" });
};

const onMonthChange = (event) => {
  const now = DateTime.now().set({ month: event.month + 1, year: event.year });
  const monthStart = now.startOf("month");
  const monthEnd = now.endOf("month");
  selectedWindowDays.value = monthEnd.day;
  workingTimeService.getTeamWorkingTimesByPeriod(
    team.value["id"],
    `${monthStart.toFormat("yyyy-MM-dd")} 00:00:00`,
    `${monthEnd.toFormat("yyyy-MM-dd")} 00:00:00`,
    (response) => {
      const usersWorkingTimes: UserWorkingTime[] = [];
      response.forEach((wt) => {
        let uwt = usersWorkingTimes.find((a) => a.user.id === wt.user.id);
        if (!uwt) {
          usersWorkingTimes.push({ times: [wt], user: wt.user });
        } else {
          uwt.times.push(wt);
        }
      });
      times.value = usersWorkingTimes;
    }
  );
};
const onMonthlyReload = () => {
  const now = DateTime.now().setLocale('fr');
  const monthStart = now.startOf("month");
  const monthEnd = now.endOf("month");
  selectedWindowDays.value = monthEnd.day;

  workingTimeService.getTeamWorkingTimesByPeriod(team.value["id"], `${monthStart.toFormat('yyyy-MM-dd')} 00:00:00`, `${monthEnd.toFormat('yyyy-MM-dd')} 00:00:00`, (workingTimes) => {
    const usersWorkingTimes: UserWorkingTime[] = [];
    workingTimes.forEach((wt) => {
      let uwt = usersWorkingTimes.find((a) => a.user["id"] === wt.user.id);
      if (!uwt) {
        usersWorkingTimes.push({times: [wt], user: wt.user});
      } else {
        uwt.times.push(wt);
      }
    });
    times.value = usersWorkingTimes;
  });
}

</script>

<template>
  <div v-if="team !== undefined">
    <EditTeamModal
      :open="open === ModalType.Edit"
      :on-dismiss="onDismissModal"
      :on-success="onTeamEdited"
      :team="team"
    />
    <DeleteTeamModal
      :open="open === ModalType.DeleteTeam"
      :on-dismiss="onDismissModal"
      :on-success="onTeamDeleted"
      :team="team"
    />
    <h1>{{ team.name }}</h1>
    <h4>Mise à jour le {{ new Date(team.updated_at).toLocaleString() }}</h4>
    <div class="actions">
      <v-btn
        @click="open = ModalType.Edit"
        color="info"
        rounded
        variant="elevated"
        text
        >Modifier la team</v-btn
      >
      <v-btn
        @click="open = ModalType.DeleteTeam"
        color="error"
        rounded
        variant="elevated"
        text
        >Supprimer la team</v-btn
      >
    </div>
    <AverageDailyChart
      :times="times"
      :number-of-months="selectedWindowDays"
      :on-month-change="onMonthChange"
      :reload="onMonthlyReload"
      average="true"
    />
    <TeamMembersList :team="team" :reload="() => loadTeam(team.id)" />
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
}
</style>
