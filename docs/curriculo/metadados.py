"""Grava os metadados dos currículos em PDF (título, autor, assunto e palavras-chave).

Uso, depois de `node docs/curriculo/gerar.js`:
    python3 docs/curriculo/metadados.py
"""
from pathlib import Path

from pypdf import PdfReader, PdfWriter

publico = Path(__file__).resolve().parents[2] / "frontend/public"

VERSOES = {
    "Claudemir_Custodio_CV.pdf": {
        "/Title": "Claudemir Custódio · Currículo",
        "/Subject": "Consultoria em arquitetura Java & Cloud · Mentoria técnica",
        "/Keywords": "Claudemir Custódio, mibess, consultoria, arquitetura de software, Java, Spring Boot, microsserviços, AWS, Angular, mentoria técnica",
    },
    "Claudemir_Custodio_CV_EN.pdf": {
        "/Title": "Claudemir Custódio · CV",
        "/Subject": "Java & Cloud architecture consulting · Technical mentoring",
        "/Keywords": "Claudemir Custódio, mibess, consulting, software architecture, Java, Spring Boot, microservices, AWS, Angular, technical mentoring",
    },
}

for nome, dados in VERSOES.items():
    arquivo = publico / nome
    leitor = PdfReader(arquivo)
    escritor = PdfWriter(clone_from=leitor)
    escritor.add_metadata({**dados, "/Author": "Claudemir Custódio", "/Creator": "mibess.com.br"})
    with open(arquivo, "wb") as f:
        escritor.write(f)
    print(f"Metadados gravados em {nome} ({arquivo.stat().st_size // 1024} KB, {len(leitor.pages)} páginas)")
