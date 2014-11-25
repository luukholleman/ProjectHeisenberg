from django.conf.urls import include, url
from api.views import APIRoot

urlpatterns = [
    url(r'', include('api.authentication.urls')),
    url(r'meetings', include('api.meeting.urls'))
]
