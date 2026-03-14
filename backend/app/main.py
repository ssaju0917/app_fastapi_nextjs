from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.modules.users import router as user_router
from app.modules.features import router as feature_router
from app.modules.diaries import router as diary_router

# 全モジュールのモデルをインポートしてテーブルを作成
# (注意: modelsをインポートしないとBase.metadataに登録されません)
from app.modules.users import models as user_models
from app.modules.features import models as feature_models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Modular Learning App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIのパス設計
app.include_router(user_router.router, prefix="/api/users", tags=["Users"])
app.include_router(feature_router.router, prefix="/api/features", tags=["Features"])
app.include_router(diary_router.router, prefix="/api/diaries", tags=["Diaries"])