from django.conf.urls import include, url
from rest_framework import routers

from api.meeting.views import MeetingViewSet, MeetingAgendaApiView, MeetingAgendaApiListView, MeetingMinutesApiView, MeetingMinutesApiListView, MeetingAttachmentsApiView, MeetingAttachmentsApiListView


router = routers.DefaultRouter(trailing_slash=False)

router.register(r'meetings', MeetingViewSet, base_name='api.v1.meeting')

urlpatterns = [
    url(r'^meetings/(?P<meetingId>\d+)/agendas$', MeetingAgendaApiListView.as_view(), name='meeting-agenda-list'),
    url(r'^meetings/(?P<meetingId>\d+)/agendas/(?P<pk>\d+)$', MeetingAgendaApiView.as_view(), name='meeting-agenda'),
    url(r'^meetings/(?P<meetingId>\d+)/minutes$', MeetingMinutesApiListView.as_view(), name='meeting-minutes-list'),
    url(r'^meetings/(?P<meetingId>\d+)/minutes/(?P<pk>\d+)$', MeetingMinutesApiView.as_view(), name='meeting-minutes'),
    url(r'^meetings/(?P<meetingId>\d+)/attachments$', MeetingAttachmentsApiListView.as_view(), name='meeting-attachments-list'),
    url(r'^meetings/(?P<meetingId>\d+)/attachments/(?P<pk>\d+)$', MeetingAttachmentsApiView.as_view(), name='meeting-attachments'),
    url(r'^', include(router.urls))
]
