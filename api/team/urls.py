from django.conf.urls import patterns, include, url
from rest_framework import routers
from api.team.views import TeamViewSet, TeamMemberApiView, TeamMemberListApiView

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'teams', TeamViewSet, base_name='api.v1.team')

urlpatterns = [
    url(r'^teams/(?P<teamId>\d+)/members$', TeamMemberListApiView.as_view(), name='team-members'),
    url(r'^teams/(?P<teamId>\d+)/members/(?P<pk>\d+)$', TeamMemberApiView.as_view(), name='team-member'),
    url(r'^', include(router.urls))
]
