from unittest import TestCase
from authentication.models import User
import random


def createUser(email, password, first_name, last_name, is_staff, is_active):
    return User.objects.create(email=email,
                               password=password,
                               first_name=first_name,
                               last_name=last_name,
                               is_staff=is_staff,
                               is_active=is_active)


class UserTestCase(TestCase):

    def test_activate_activates_user(self):
        """Create inactive user"""
        user = createUser(email='test@test.nl', password='wee', first_name='test', last_name='test', is_staff=False, is_active=False)
        user.activate()
        self.assertTrue(user.is_active)

    def test_administrator_is_staff_and_active(self):
        """Users who are staff are flagged with is_staff=true"""
        admin = createUser(email='admin@punkasdtli.ch',
                           password='pbkdf2_sha256$12000$HioPsiaBxrqj$jNnLqrZK',
                           first_name='Punktlich',
                           last_name='test administrator',
                           is_staff=True,
                           is_active=True)
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_active)

    def test_user_is_not_staff(self):
        """Users who aren't staff should be flagged with is_staff=false"""
        user = createUser(email='user@punktli.ch',
                          password='pbkdf2_sha256$12000$HioPsiaBxrqj$jNnLqrZK',
                          first_name='Punktlich',
                          last_name='test user',
                          is_staff=False,
                          is_active=True)
        self.assertFalse(user.is_staff)


    def test_inactive_user_is_not_active(self):
        """Users who aren't active should be flagged with is_active=false"""
        user = createUser(email='inactive_user@punktli.ch',
                          password='pbkdf2_sha256$12000$HioPsiaBxrqj$jNnLqrZK',
                          first_name='Punktlich',
                          last_name='test inactive usera',
                          is_staff=False,
                          is_active=False)
        self.assertFalse(user.is_active)

    def test_short_name(self):
        """The short name of a user is his first name"""
        user = createUser(email='shortname_user@punktli.ch',
                          password='pbkdf2_sha256$12000$HioPsiaBxrqj$jNnLqrZK',
                          first_name='Punktlich',
                          last_name='test inactive users',
                          is_staff=False,
                          is_active=True)
        self.assertEqual(user.get_short_name(), user.first_name)


    def test_full_name(self):
        """The full name of a user is his first name"""
        user = createUser(email='fullname_user@punktli.ch',
                          password='pbkdf2_sha256$12000$HioPsiaBxrqj$jNnLqrZK',
                          first_name='Punktlich',
                          last_name='test inactive user',
                          is_staff=False,
                          is_active=True)
        self.assertEqual(user.get_full_name(), '%s %s' % (user.first_name, user.last_name))
        self.assertEqual(user.get_username(), user.email)
