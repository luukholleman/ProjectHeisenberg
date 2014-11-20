from django.conf.urls import include, url
from api.views import APIRoot

urlpatterns = [
    url('', include('api.authentication.urls')),
]
