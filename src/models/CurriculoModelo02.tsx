import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Tipagens
type DadosPessoais = {
  nome: string;
  idade: number;
  estadoCivil: string;
  endereco: string;
  cidade: string;
  telefone: string;
  email: string;
};

type ObjetivoProfissional = {
  perfilPessoal: string;
  objetivoProfissional: string;
};

type Formacao = {
  instituicao: string;
  curso: string;
  nivel: string;
  conclusao: string;
};

type ExperienciaProfissional = {
  empresa: string;
  cargo: string;
  admissao: Date;
  encerramento: Date;
  funcoes: string[];
};

type FormDataCompleto = {
  dadosPessoais?: DadosPessoais;
  objetivoProfissional?: ObjetivoProfissional;
  formacoes?: Formacao[];
  experiencias?: ExperienciaProfissional[];
  foto?: string;
  corLateral: string;
};

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  sidebar: {
    width: "40%",
    minHeight: "100vh",
    padding: 16,
    color: "#fff",
  },
  main: {
    width: "60%",
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textBlock: {
    marginTop: 6,
    textAlign: "justify",
    lineHeight: 1.4,
  },
  bold: {
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: "cover",
    marginBottom: 16,
  },
});

// Lê os dados consolidados do localStorage
const getFormDataFromStorage = (): FormDataCompleto | null => {
  try {
    const data = localStorage.getItem("formData");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Erro ao buscar formData:", err);
    return null;
  }
};

// Componente PDF
const ModeloCurriculo: React.FC = () => {
  const formData = getFormDataFromStorage();

  if (!formData || !formData.dadosPessoais || !formData.objetivoProfissional) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Dados insuficientes para gerar o currículo.</Text>
        </Page>
      </Document>
    );
  }

  const {
    dadosPessoais,
    objetivoProfissional,
    formacoes,
    experiencias,
    foto,
    corLateral,
  } = formData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Barra Lateral */}
        <View style={[styles.sidebar, { backgroundColor: corLateral }]}>
          {foto && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={foto} style={styles.image} />
          )}
          <Text style={{ fontSize: 18, marginBottom: 8 }}>
            {dadosPessoais.nome}
          </Text>
          <Text>
            {dadosPessoais.estadoCivil}, {dadosPessoais.idade} anos
          </Text>
          <Text style={{ marginTop: 8 }}>
            <Text style={styles.bold}>Endereço:</Text> {dadosPessoais.endereco}
          </Text>
          <Text>
            <Text style={styles.bold}>Cidade:</Text> {dadosPessoais.cidade}
          </Text>
          <Text>
            <Text style={styles.bold}>Email:</Text> {dadosPessoais.email}
          </Text>
          <Text>
            <Text style={styles.bold}>Telefone:</Text> {dadosPessoais.telefone}
          </Text>
        </View>

        {/* Conteúdo Principal */}
        <View style={styles.main}>
          {/* Perfil Pessoal */}
          <View style={styles.section}>
            <Text style={styles.title}>PERFIL PESSOAL</Text>
            <Text style={styles.textBlock}>
              {objetivoProfissional.perfilPessoal}
            </Text>
          </View>

          {/* Objetivo Profissional */}
          <View style={styles.section}>
            <Text style={styles.title}>OBJETIVO PROFISSIONAL</Text>
            <Text style={styles.textBlock}>
              {objetivoProfissional.objetivoProfissional}
            </Text>
          </View>

          {/* Formação Acadêmica */}
          {formacoes && formacoes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>FORMAÇÃO ACADÊMICA</Text>
              {formacoes.map((formacao, idx) => (
                <View key={idx}>
                  <Text style={styles.bold}>
                    {formacao.nivel}: {formacao.curso}
                  </Text>
                  <Text>
                    {formacao.instituicao} • Conclusão: {formacao.conclusao}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Experiência Profissional */}
          {experiencias && experiencias.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>EXPERIÊNCIA PROFISSIONAL</Text>
              {experiencias.map((exp, idx) => (
                <View key={idx} style={{ marginBottom: 12 }}>
                  <Text style={styles.bold}>{exp.empresa}</Text>
                  <Text>
                    {exp.cargo} | {new Date(exp.admissao).getFullYear()} -
                    {new Date(exp.encerramento).getFullYear()}
                  </Text>
                  <Text style={styles.bold}>Funções:</Text>
                  <Text>• {exp.funcoes.join("\n• ")}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ModeloCurriculo;
