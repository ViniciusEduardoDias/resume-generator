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
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "Helvetica",
    padding: 20,
  },
  sidebar: {
    width: "40%",
    height: "100%",
    backgroundColor: "#333333",
    color: "#FFFFFF",
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textWrap: "nowrap",
  },
  sidebarCentered: {
    textAlign: "center",
    marginTop: 4,
  },
  content: {
    width: "60%",
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textWrap: "nowrap",
  },
  textSmall: {
    fontSize: 8,
    marginTop: 4,
    textWrap: "nowrap",
  },
  textBlock: {
    marginTop: 6,
    marginBottom: 8,
    textAlign: "justify",
    lineHeight: 1,
    textWrap: "nowrap",
  },
  bold: {
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: "cover",
    marginBottom: 10,
  },
  spacedView: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});

// Componente PDF
const CurriculoModelo02: React.FC = () => {
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

  const sidebarStyle = {
    ...styles.sidebar,
    backgroundColor:
      (color && darkColors[color as keyof typeof darkColors]) || "#333333",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={sidebarStyle}>
          {foto && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={foto} style={styles.image} />
          )}
          <Text style={{ fontSize: 22, ...styles.sidebarCentered }}>
            {dadosPessoais.nome}
          </Text>
          <Text style={styles.sidebarCentered}>
            {dadosPessoais.estadoCivil}, {dadosPessoais.idade} anos
          </Text>
          <View style={styles.spacedView}>
            <Text style={[styles.textSmall, styles.bold]}>Endereço:</Text>
            <Text>{dadosPessoais.endereco}</Text>
          </View>
          <View style={styles.spacedView}>
            <Text style={[styles.textSmall, styles.bold]}>Cidade:</Text>
            <Text>{dadosPessoais.cidade}</Text>
          </View>
          <View style={styles.spacedView}>
            <Text style={[styles.textSmall, styles.bold]}>Email:</Text>
            <Text>{dadosPessoais.email}</Text>
          </View>
          <View style={styles.spacedView}>
            <Text style={[styles.textSmall, styles.bold]}>Telefone:</Text>
            <Text>{dadosPessoais.telefone}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.title}>PERFIL PESSOAL</Text>
            <Text style={styles.textBlock}>
              {objetivoProfissional.perfilPessoal}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>OBJETIVO PROFISSIONAL</Text>
            <Text style={styles.textBlock}>
              {objetivoProfissional.objetivoProfissional}
            </Text>
          </View>
          {formacoes && formacoes.length > 0 && (
            <View>
              <Text style={styles.title}>FORMAÇÃO ACADÊMICA</Text>
              {formacoes.map((formacao, idx) => (
                <View key={idx} style={{ marginBottom: 10 }}>
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
          {experiencias && experiencias.length > 0 && (
            <View>
              <Text style={styles.title}>EXPERIÊNCIA PROFISSIONAL</Text>
              {experiencias.map((exp, idx) => (
                <View key={idx} style={{ marginBottom: 12 }}>
                  <Text style={styles.bold}>{exp.empresa}</Text>
                  <Text>
                    {exp.cargo} | {new Date(exp.admissao).getFullYear()} -{" "}
                    {new Date(exp.encerramento).getFullYear()}
                  </Text>
                  {exp.funcoes.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {exp.funcoes.map((funcao, funcIdx) => (
                        <Text key={funcIdx}>• {funcao}</Text>
                      ))}
                    </View>
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

export default CurriculoModelo02;
