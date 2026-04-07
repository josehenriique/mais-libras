# +Libras 🤟

Sistema inteligente de reconhecimento de sinais em LIBRAS (Língua Brasileira de Sinais), desenvolvido com foco em acessibilidade, inclusão e apoio pedagógico em ambientes educacionais.

---

## 📌 Sobre o Projeto

O **+Libras** é uma aplicação que utiliza **Visão Computacional** e **Inteligência Artificial** para identificar sinais em LIBRAS em tempo real através da webcam.

O projeto surge como uma solução para auxiliar no ensino e aprendizado da língua de sinais, promovendo inclusão e facilitando a comunicação entre pessoas surdas e ouvintes no ambiente educacional.

---

## 🎯 Objetivo

Desenvolver uma ferramenta capaz de:

* Reconhecer sinais em LIBRAS em tempo real
* Auxiliar professores e alunos no processo de aprendizagem
* Promover acessibilidade e inclusão
* Aplicar conceitos de IA em um contexto social relevante

---

## 🚀 Tecnologias Utilizadas

### 🧠 Inteligência Artificial

* Python
* TensorFlow
* Keras
* NumPy

### 👁️ Visão Computacional

* OpenCV
* MediaPipe

### 🌐 Web

* Django
* HTML / CSS / JavaScript

---

## ⚙️ Como Funciona

1. A webcam captura os movimentos das mãos do usuário
2. O MediaPipe identifica pontos-chave (landmarks) das mãos
3. Esses dados são processados e enviados para o modelo de IA
4. O modelo realiza a previsão do sinal em LIBRAS
5. O resultado é exibido em tempo real na interface

---

## 🧠 Modelo de IA

Diferente de muitas soluções, o modelo utilizado no +Libras foi:

* Treinado **do zero**
* Utilizando dados coletados pela equipe
* Com validação baseada em sinais reais de LIBRAS

Arquivo do modelo:

```
webcam/models/tcc_info_2025.task
```

---

## 📁 Estrutura do Projeto

```
+Libras/
│
├── applicationWebCam/     # Configurações principais do Django
├── webcam/                # App principal
│   ├── models/            # Modelo de IA (.task)
│   ├── templates/         # Interface web
│   ├── views.py
│   └── ...
│
├── manage.py
├── requirements.txt
└── README.md
```

---

## 📈 Possíveis Melhorias

* Expansão do vocabulário de sinais
* Treinamento com mais usuários
* Versão mobile
* API para integração com outras plataformas
* Interface mais interativa

---

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`feature/minha-feature`)
3. Commit suas alterações
4. Push para a branch
5. Abra um Pull Request

---

## 📚 Contexto Acadêmico

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) no IFBA, com foco na aplicação prática de Inteligência Artificial para impacto social.

---

## 👨‍💻 Autor

**José Henrique**
Designer & Desenvolvedor