from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from api.authentication.views import UserViewSet
from api.meeting.views import MeetingViewSet

router = DefaultRouter(trailing_slash=False)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^', include('api.meeting.urls')),
    url(r'^', include('api.authentication.urls'))
]
