from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^', include('api.meeting.urls')),
    url(r'^', include('api.team.urls')),
    url(r'^', include('api.authentication.urls'))
]
