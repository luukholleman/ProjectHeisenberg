from django.core.management import BaseCommand
from autofixture import AutoFixture
from team.models import Team


class Command(BaseCommand):
    def handle(self, *args, **options):
        fixture = AutoFixture(Team, generate_fk=True)
        fixture.create(1000)