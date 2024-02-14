import { plataformApi } from "@/service/plataform";
import { useQuery } from "@tanstack/react-query";

export const useFindRole = (id: string) =>
  useQuery({
    queryKey: [`roles-${id}`],
    queryFn: () => findRole(id),
    retry: false,
    refetchOnMount: true,
  });

const findRole = async (id: string) => {
  console.log("id", id);

  return await plataformApi.patch(`/roles/${{ id }}`);
};
