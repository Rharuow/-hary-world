import { plataformApi } from "@/service/plataform";
import { useQuery } from "@tanstack/react-query";

export const useFindRoleByName = (name: string) =>
  useQuery({
    queryKey: [`roles-${name}`],
    queryFn: () => findRoleByName(name),
    retry: false,
    refetchOnMount: true,
  });

const findRoleByName = async (name: string) => {
  return await plataformApi.get(`/roles?name=${name}`);
};
