from typing import Optional
from pydantic import BaseModel


class Author(BaseModel):
    name: str
    birth_year: Optional[int]
    death_year: Optional[int]


class Book(BaseModel):
    id: int
    title: str
    authors: list[Author]
    subjects: list
    bookshelves: list
    formats: dict
    download_count: int
