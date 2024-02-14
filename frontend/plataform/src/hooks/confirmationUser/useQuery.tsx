import { plataformApi } from "@/service/plataform";
import { useQuery } from "@tanstack/react-query";

export const useConfirmationUser = (id: string) =>
  useQuery({
    queryKey: [`confirmation-user-${id}`],
    queryFn: () => confirmationUser(id),
    retry: false,
    refetchOnMount: true,
  });

const confirmationUser = async (id: string) => {
  return await plataformApi.patch("/users/confirmation", { id });
};
