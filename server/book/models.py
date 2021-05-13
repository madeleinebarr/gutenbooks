# from sqlalchemy import Column, Integer, String, Array, JSON, ForeignKey
from sqlalchemy import Column, Integer, String, ForeignKey, PickleType, JSON
from book.database import Base
from sqlalchemy.orm import relationship


class Book(Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    authors = Column(PickleType)
    subjects = Column(PickleType)
    bookshelves = Column(PickleType)
    formats = Column(JSON)
    download_count = Column(Integer)
