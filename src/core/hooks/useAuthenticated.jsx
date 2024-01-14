import { useSelector } from "react-redux";

export function useAuthenticated() {
  // console.log("=======12=========")
  // console.log(state.auth.profile)
  // console.log("=======23=========")
  return useSelector((state) => Boolean(state.auth.profile?.user?.id));
  // return useSelector((state) => {
  //   console.log("=======12=========")
  //   console.log(state.auth.profile)
  //   console.log("=======23=========")
  // });
}
