from django.conf.urls import include, url
from rest_framework import routers
from api.meeting.views import MeetingViewSet

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'', MeetingViewSet, base_name='api.v1.meeting')

urlpatterns = router.urls