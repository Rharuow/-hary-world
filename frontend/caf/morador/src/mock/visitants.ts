export interface IVisitant {
  name: string;
  type: "pedestrian" | "driver";
  cpf: string;
  email?: string;
  phone: string;
  cnh?: string;
  code: string;
  available: {
    status: "allowed" | "blocked" | "processing";
    justifications?: Array<string>;
  };
}

export const visitantsData: Array<IVisitant> = [
  {
    name: "Visitante 1",
    phone: "(00) 00000-0000",
    type: "pedestrian",
    code: "123456",
    available: { status: "allowed" },
    cpf: "972.838.690-77",
  },
  {
    name: "Visitante 2",
    phone: "(00) 00000-0000",
    email: "visitant@visitant.com",
    type: "driver",
    code: "123456",
    available: { status: "allowed" },
    cpf: "977.320.570-31",
  },
  {
    name: "Visitante 3",
    phone: "(00) 00000-0000",
    type: "driver",
    code: "123456",
    available: {
      status: "blocked",
      justifications: ["Falta de verificação da habilitação"],
    },
    cpf: "293.324.370-92",
  },
  {
    name: "Visitante 4",
    phone: "(00) 00000-0000",
    type: "pedestrian",
    code: "123456",
    available: {
      status: "processing",
      justifications: ["Descumprimento das regras internas"],
    },
    cpf: "325.761.990-11",
  },
];
