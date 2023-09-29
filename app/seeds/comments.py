from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text

def seed_comments():
  comment1 = Comment(
    user_id=8,
    recipe_id=7,
    comment="IT'S RAWWWWWWWW 🐮🐄🐮🐄🐄🐮🤠!!!"
  )
  comment2 = Comment(
    user_id=8,
    recipe_id=3,
    comment="WHERE'S THE LAMB SAUCCCCEEEE!?! 🐑🐏🐑🐏",
    comment_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/rickroll-roll.gif'
  )
  comment3 = Comment(
    user_id=5,
    recipe_id=9,
    comment="smdh",
    comment_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/dwight.gif'
  )
  comment4 = Comment(
    user_id=4,
    recipe_id=9,
    comment="LOL gordon boutta get BANNED 🦍"
  )
  comment5 = Comment(
    user_id=8,
    recipe_id=9,
    comment="DON'T PUT RICE CRACKERS ON FISH, YOU DONUT!!! 🙄🤪😵🤢🤮"
  )
  comment6 = Comment(
    user_id=7,
    recipe_id=3,
    comment="ty for this recipe, my mom loved it!",
    comment_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/herringReal.jpg'
  )
  comment7 = Comment(
  user_id=8,
  recipe_id=6,
  comment="IT'S RAWWWWWWWW!!! 🐮🐄🐮🐄🐄🐮🤠"
  )
  comment8 = Comment(
    user_id=3,
    recipe_id=3,
    comment="i made it too. u like it or naw",
    comment_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/herringReal2.webp'
  )
  comment9 = Comment(
    user_id=9,
    recipe_id=3,
    comment="kiki!! look it's me!! buy me pls",
    comment_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/jijiMug.webp'
  )
  comment10 = Comment(
    user_id=6,
    recipe_id=3,
    comment="it is acceptable."
  )
  comment11 = Comment(
    user_id=6,
    recipe_id=9,
    comment='good job, Megumi. we did great!'
  )
  comment12 = Comment(
    user_id=3,
    recipe_id=9,
    comment="BRIAN'S CHIN YALL WOOOOOOO",
    comment_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/brianChin.png'
  )

  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)
  db.session.add(comment6)
  db.session.add(comment7)
  db.session.add(comment8)
  db.session.add(comment9)
  db.session.add(comment10)
  db.session.add(comment11)
  db.session.add(comment12)
  db.session.commit()

def undo_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM comments"))

  db.session.commit()