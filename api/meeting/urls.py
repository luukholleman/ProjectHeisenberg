from rest_framework import routers
from api.meeting.views import MeetingViewSet, AgendaViewSet

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'meetings', MeetingViewSet, base_name='api.v1.meeting')
router.register(r'agendas', AgendaViewSet, base_name='api.v1.agenda')

urlpatterns = router.urls