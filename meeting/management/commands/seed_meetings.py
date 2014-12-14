from django.core.management import BaseCommand
from faker import Faker
from authentication.models import User
from meeting.models import Meeting, MeetingInvitation
from autofixture import AutoFixture


class Command(BaseCommand):
    def handle(self, *args, **options):
        fixture = AutoFixture(MeetingInvitation, generate_fk=True, generate_m2m=True)
        fixture.create(1000)
