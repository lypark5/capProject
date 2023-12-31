from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='Lition', email='demo@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/steve.jpg', password='password')
    kiki = User(
        username='Kiki', first_name='Kiki', last_name='Delivery', email='kiki@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/kiki.jpg', password='password')
    jake = User(
        username='JakeTheDog', first_name='Jake', last_name='Dog', email='jake@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/jake.jpg', password='password')
    lisa = User(
        username='Lisa', first_name='Lisa', last_name='Ponyo', email='lisa@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/lisa.jpg', password='password')
    spongebob = User(
        username='Spongebob', first_name='Spongebob', last_name='Squarepants', email='spongebob@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/spongebob.jpg', password='password')
    shokugeki = User(
        username='Shokugeki', first_name='Soma', last_name='Yukihira', email='shokugeki@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/yukihira.jpg', password='password')
    megumi = User(
        username='Megumi', first_name='Megumi', last_name='Tadokoro', email='megumi@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/megumi.jpg', password='password')
    gordon = User(
        username='ChefGordon', first_name='Gordon', last_name='Ramsay', email='gordon@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/gordonRamsay.jpg', password='password')
    jiji = User(
        username='Jiji', first_name='Jiji', last_name='the_Cat', email='jiji@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/jiji.jpg', password='password')
    remy = User(
        username='Remy', first_name='Remy', last_name='Mouse', email='remy@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/remy.jpg', password='password')
    icebear = User(
        username='IceBear', first_name='Ice', last_name='Bear', email='icebear@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/icebear.jpg', password='password')
    lars = User(
        username='Lars', first_name='Lars', last_name='Barriga', email='lars@aa.io', profile_pic='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/lars.jpg', password='password')

    db.session.add(demo)
    db.session.add(kiki)
    db.session.add(jake)
    db.session.add(lisa)
    db.session.add(spongebob)
    db.session.add(shokugeki)
    db.session.add(megumi)
    db.session.add(gordon)
    db.session.add(jiji)
    db.session.add(remy)
    db.session.add(icebear)
    db.session.add(lars)
    db.session.commit()

    return [demo, kiki, jake, lisa, spongebob, shokugeki, megumi, gordon, jiji, remy, icebear, lars]


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()