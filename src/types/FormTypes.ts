export type DadosPessoais = {
  nome: string;
  idade: number;
  estadoCivil: string;
  endereco: string;
  cidade: string;
  telefone: string;
  email: string;
  genero: string;
};

export type ObjetivoProfissional = {
  perfilPessoal: string;
  objetivoProfissional: string;
};

export type Formacao = {
  instituicao: string;
  curso: string;
  nivel: string;
  conclusao: string;
};

export type ExperienciaProfissional = {
  empresa: string;
  cargo: string;
  admissao: string;
  encerramento: string;
  funcoes: string[];
};

export type FormDataCompleto = {
  dadosPessoais?: DadosPessoais;
  objetivoProfissional?: ObjetivoProfissional;
  formacoes?: Formacao[];
  experiencias?: ExperienciaProfissional[];
  foto?: string;
  modelo: string;
  color: string;
};
