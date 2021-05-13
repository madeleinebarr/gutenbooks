from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from book import models
from book import schemas
# from book import database
from book.database import engine, get_db, SessionLocal
from sqlalchemy.orm import Session
# import http3


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# engine = database.engine
# get_db = database.get_db
# SessionLocal = database.SessionLocal

models.Base.metadata.create_all(engine)


@app.get('/')
def root():
    return {'Welcome to your archived books API.'}


# @app.post('/book')
# def create(request: schemas.Book, db: Session = Depends(get_db)):
#     new_book = models.Book(id=request.id, title=request.title, authors=request.authors, subjects=request.subjects,
#                            bookshelves=request.bookshelves, formats=request.formats, download_count=request.download_count)
#     db.add(new_book)
#     db.commit()
#     db.refresh(new_book)
#     return new_book

def get_all(db: Session):
    books = db.query(models.Book).order_by(
        models.Book.download_count.desc()).all()
    return books


@app.get('/books')
def all(db: Session = Depends(get_db)):
    return get_all(db)

# @app.get('/books')
# def all(db: Session = Depends(get_db)):
#     books = db.query(models.Book).order_by(
#         models.Book.download_count.desc()).all()
#     return books


@app.get('/book/{id}')
def show(id: int, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter_by(id=id).first()
    return book


@app.get('/book/{id}/authors')
def get_authors(id: int, db: Session = Depends(get_db)):
    authors_array = db.query(models.Book).filter_by(id=id).one().authors
    return {
        'authors': authors_array
    }


@app.get('/book/{id}/subjects')
def get_subjects(id: int, db: Session = Depends(get_db)):
    subjects_array = db.query(models.Book).filter_by(id=id).one().subjects
    return {
        'subjects': subjects_array
    }


@app.get('/book/{id}/bookshelves')
def get_bookshelves(id: int, db: Session = Depends(get_db)):
    bookshelves_array = db.query(
        models.Book).filter_by(id=id).one().bookshelves
    return {
        'bookshelves': bookshelves_array
    }

# calling external API


# client = http3.AsyncClient()


# async def call_gutendex(url: str):
#     response = await client.get(url)
#     jsonresponse = response.json()
#     return jsonresponse["results"]


# @app.get('/gutendex')
# async def root():
#     result = await call_gutendex("http://gutendex.com/books/?ids=83")
#     return result[0]["subjects"]


# @app.post('/gutendex')
# async def create(db: Session = Depends(get_db)):
#     result = await call_gutendex("http://gutendex.com/books/?ids=83")
#     new_book = models.Book(id=result[0]["id"], title=result[0]["title"], authors=result[0]["authors"], subjects=result[0]["subjects"],
#                            bookshelves=result[0]["bookshelves"], formats=result[0]["formats"], download_count=result[0]["download_count"])
#     db.add(new_book)
#     db.commit()
#     db.refresh(new_book)
#     return new_book

# route works great for the first page


# @app.post('/gutendex/multiple')
# async def create(db: Session = Depends(get_db)):
#     result = await call_gutendex("http://gutendex.com/books/?page=10")
#     for i in range(0, len(result)):
#         new_book = models.Book(id=result[i]["id"], title=result[i]["title"], authors=result[i]["authors"], subjects=result[i]["subjects"],
#                                bookshelves=result[i]["bookshelves"], formats=result[i]["formats"], download_count=result[i]["download_count"])
#         db.add(new_book)
#         db.commit()
#         db.refresh(new_book)
#     return result
