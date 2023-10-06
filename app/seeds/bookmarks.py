from app.models import db, environment, SCHEMA, Bookmark
from sqlalchemy.sql import text

def seed_bookmarks(user, recipe):     #
  bookmark1 = Bookmark(
    recipe_id=1,
    user_id=7
  )
  bookmark2 = Bookmark(
    recipe_id=3,
    user_id=7
  )
  # bookmark3 = Bookmark(
  #   recipe_id=7,
  #   user_id=7
  # )
  # bookmark4 = Bookmark(
  #   recipe_id=8,
  #   user_id=7
  # )
  # bookmark5 = Bookmark(
  #   recipe_id=2,
  #   user_id=1
  # )
  # bookmark6 = Bookmark(
  #   recipe_id=4,
  #   user_id=1
  # )
  # bookmark7 = Bookmark(
  #   recipe_id=6,
  #   user_id=1
  # )
  # bookmark8 = Bookmark(
  #   recipe_id=3,
  #   user_id=5
  # )
  # bookmark9 = Bookmark(
  #   recipe_id=9,
  #   user_id=5
  # )
  # bookmark10 = Bookmark(
  #   recipe_id=2,
  #   user_id=3
  # )
  # bookmark11 = Bookmark(
  #   recipe_id=6,
  #   user_id=3
  # )


  db.session.add(bookmark1)
  db.session.add(bookmark2)
  # db.session.add(bookmark3)
  # db.session.add(bookmark4)
  # db.session.add(bookmark5)
  # db.session.add(bookmark6)
  # db.session.add(bookmark7)
  # db.session.add(bookmark8)
  # db.session.add(bookmark9)
  # db.session.add(bookmark10)
  # db.session.add(bookmark11)
  db.session.commit()


def undo_bookmarks():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM bookmarks"))

  db.session.commit()