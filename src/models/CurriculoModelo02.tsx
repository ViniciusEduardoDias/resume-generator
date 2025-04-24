import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useFormData } from "@/hooks/useFormData";

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
  admissao: string;
  encerramento: string;
  funcoes: string[];
};

type FormDataCompleto = {
  dadosPessoais?: DadosPessoais;
  objetivoProfissional?: ObjetivoProfissional;
  formacoes?: Formacao[];
  experiencias?: ExperienciaProfissional[];
  foto?: string;
  modelo: string;
  color: string;
};

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    padding: 16,
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#FFFFFF",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    marginTop: 10,
  },
  textBlock: {
    marginTop: 6,
    textAlign: "justify",
    lineHeight: 1.0,
  },
  bold: {
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    objectFit: "cover",
    borderWidth: 20,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
  },
});

// Componente PDF
const CurriculoModelo01: React.FC = () => {
  const { get } = useFormData();
  const [formData, setFormData] = useState<FormDataCompleto | null>(null);

  useEffect(() => {
    const data = get();
    setFormData(data);
  }, [get]);

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
    color,
  } = formData;

  const darkColors: Record<string, string> = {
    yellow: "#b59f00",
    gray: "#333333",
    pink: "#800040",
    blue: "#001f4d",
    green: "#006400",
    black: "#000000",
  };

  const headerStyle = {
    ...styles.header,
    backgroundColor:
      (color && darkColors[color as keyof typeof darkColors]) || "#333333",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Foto + Dados Pessoais */}
        <View
          style={[
            headerStyle,
            styles.row,
            { justifyContent: "space-around", gap: 8 },
          ]}
        >
          {foto && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={foto} style={styles.image} />
          )}
          <View style={styles.column}>
            <Text style={{ fontSize: 22 }}>{dadosPessoais.nome}</Text>

            <Text>
              {dadosPessoais.estadoCivil}, {dadosPessoais.idade} anos
            </Text>
            <Text>
              <Text style={styles.bold}>Endereço:</Text>{" "}
              {dadosPessoais.endereco}
            </Text>
            <Text>
              <Text style={styles.bold}>Cidade:</Text> {dadosPessoais.cidade}
            </Text>
            <Text>
              <Text style={styles.bold}>Email:</Text> {dadosPessoais.email}
            </Text>
            <Text>
              <Text style={styles.bold}>Telefone:</Text>{" "}
              {dadosPessoais.telefone}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
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
                <View key={idx} style={styles.column}>
                  <Text style={styles.bold}>
                    {formacao.nivel}: {formacao.curso}
                  </Text>
                  <Text>
                    {formacao.instituicao} • Conclusão:{" "}
                    {new Date(formacao.conclusao).getFullYear()}
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
                    {exp.cargo} | {new Date(exp.admissao).getFullYear()} -{" "}
                    {new Date(exp.encerramento).getFullYear()}
                  </Text>
                  {exp.funcoes.length > 0 && (
                    <>
                      <Text style={styles.bold}>Funções:</Text>
                      <Text> {exp.funcoes.join("\n• ")}</Text>
                    </>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CurriculoModelo01;
