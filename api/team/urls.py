from rest_framework import routers
from api.team.views import TeamViewSet

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'teams', TeamViewSet, base_name='api.v1.team')

urlpatterns = router.urls