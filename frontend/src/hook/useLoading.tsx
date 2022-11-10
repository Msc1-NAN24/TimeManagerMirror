import {ref} from "vue";
import {IsLogged, useAuthStore} from "@/store/AuthStore";
import {storeToRefs} from "pinia";

export function useLoading() {

  const auth = useAuthStore();
  const {user, isLogged} = storeToRefs(auth);
  const loading = ref<boolean>(true);

  if (user?.value !== undefined) {
    console.log('abc', user.value);
    loading.value = false;
  }

  const setLoading = (value: boolean) => {
    loading.value = value;
  }

  const toggleLoading = () => {
    loading.value = !loading.value;
  }

  auth.$subscribe((mutation, state) => {
    console.log('DEF');
    if (state.user !== undefined && state.isLogged !== IsLogged.Loading) {
      console.log('ABC');
      loading.value = false;
    }
  });

  return {
    loading,
    setLoading,
    toggleLoading,
  }

}