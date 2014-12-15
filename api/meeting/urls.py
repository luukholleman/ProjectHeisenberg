from django.conf.urls import patterns, include, url
from rest_framework import routers
from api.meeting.views import MeetingViewSet
from api.meeting.views import MeetingAgendaApiView

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'meetings', MeetingViewSet, base_name='api.v1.meeting')

urlpatterns = [
    url(r'^meetings/(?P<meetingId>\d+)/agendas', MeetingAgendaApiView.as_view(), name='meeting-agenda'),
    url(r'^', include(router.urls))
]
