from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.la_centrale_router import router as la_centrale_router

app = FastAPI()
app.include_router(la_centrale_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health-check")
def health_check():
    return True
