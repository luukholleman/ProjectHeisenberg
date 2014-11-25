from rest_framework import routers
from api.meeting.views import MeetingViewSet

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'meetings', MeetingViewSet)

urlpatterns = router.urls