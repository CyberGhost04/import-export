import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

frontend_dist = Path(os.getenv("FRONTEND_DIST", "/app/frontend-dist"))
frontend_index = frontend_dist / "index.html"

app = FastAPI(
    title="Akshatra Bluewater Logistics API",
    description="File-backed trade portfolio and destination market data for Akshatra Bluewater Logistics.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


if frontend_index.is_file():
    @app.get("/{path:path}", include_in_schema=False)
    def serve_frontend(path: str) -> FileResponse:
        requested_file = (frontend_dist / path).resolve()
        if requested_file.is_relative_to(frontend_dist.resolve()) and requested_file.is_file():
            return FileResponse(requested_file)
        return FileResponse(frontend_index)
