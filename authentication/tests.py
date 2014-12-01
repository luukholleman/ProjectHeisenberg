from django.test import TestCase
from authentication.models import User
from datetime import timedelta, datetime
import random


def createUser(email, password, first_name, last_name, is_staff, is_active):
    return User.objects.create(email=email,
                               password=password,
                               first_name=first_name,
                               last_name=last_name,
                               is_staff=is_staff,
                               is_active=is_active)


class UserTestCase(TestCase):

    def setUp(self):
        """Create test data"""
        self.user = createUser(email='test1235@test.nl', password='wee', first_name='test', last_name='test', is_staff=False,
                          is_active=False)

    def test_user_can_activate_with_hash(self):
        """Test if user can be activated with generated hash"""
        self.user.set_activation(expire_days=7)

        self.assertIsNotNone(self.user.activation_token)

        resp = self.client.post('/api/v1/users/activate/', {'activation_token': self.user.activation_token})
        self.assertEquals(resp.status_code, 200)

        # get the user
        user = User.objects.filter(pk=self.user.pk).get()

        # check if user is activated
        self.assertTrue(user.is_active)

    def test_activate_sets_date_in_future(self):
        """Test if expire date is set correctly"""
        expire_days = 7
        self.user.set_activation(expire_days=expire_days)

        today = datetime.now()
        diff = self.user.activation_expire - today

        # Add one day to add today
        self.assertEquals(diff.days + 1, expire_days)
        self.assertIsNotNone(self.user.activation_token)

    def test_activate_activates_user(self):
        """Create inactive user"""
        self.user.activate()
        self.assertTrue(self.user.is_active)

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
                          last_name='test inactive user',
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
