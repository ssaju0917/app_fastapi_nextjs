@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.username == username).first()
if not user or not pwd_context.verify(password, user.hashed_password):
raise HTTPException(status_code=401, detail="Invalid credentials")
  token = create_access_token({"sub": str(user.id)})
return {"access_token": token, "token_type": "bearer"}