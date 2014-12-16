from django.conf.urls import patterns, include, url
from rest_framework import routers
from api.meeting.views import MeetingViewSet, MeetingAgendaApiView, MeetingMinutesApiView

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'meetings', MeetingViewSet, base_name='api.v1.meeting')

urlpatterns = [
    url(r'^meetings/(?P<meetingId>\d+)/agendas$', MeetingAgendaApiView.as_view(), name='meeting-agenda'),
    url(r'^meetings/(?P<meetingId>\d+)/agendas/(?P<pk>\d+)$', MeetingAgendaApiView.as_view(), name='meeting-agenda'),
    url(r'^meetings/(?P<meetingId>\d+)/minutes', MeetingMinutesApiView.as_view(), name='meeting-minutes'),
    url(r'^meetings/(?P<meetingId>\d+)/minutes/(?P<pk>\d+)$', MeetingMinutesApiView.as_view(), name='meeting-minutes'),
    url(r'^', include(router.urls))
]
