"""Grava os metadados do currículo em PDF (título, autor, assunto e palavras-chave).

Uso, depois de `node docs/curriculo/gerar.js`:
    python3 docs/curriculo/metadados.py
"""
from pathlib import Path

from pypdf import PdfReader, PdfWriter

arquivo = Path(__file__).resolve().parents[2] / "frontend/public/Claudemir_Custodio_CV.pdf"

leitor = PdfReader(arquivo)
escritor = PdfWriter(clone_from=leitor)
escritor.add_metadata(
    {
        "/Title": "Claudemir Custódio · Currículo",
        "/Author": "Claudemir Custódio",
        "/Subject": "Consultoria em arquitetura Java & Cloud · Mentoria técnica",
        "/Keywords": "Claudemir Custódio, mibess, consultoria, arquitetura de software, Java, Spring Boot, microsserviços, AWS, Angular, mentoria técnica",
        "/Creator": "mibess.com.br",
    }
)
with open(arquivo, "wb") as f:
    escritor.write(f)
print(f"Metadados gravados em {arquivo.name} ({arquivo.stat().st_size // 1024} KB, {len(leitor.pages)} páginas)")
