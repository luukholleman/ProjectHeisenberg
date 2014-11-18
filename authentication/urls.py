from django.conf.urls import include, url
from rest_framework import routers
from authentication.views import UserViewSet

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    # url(r'^login', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^login', 'rest_framework.authtoken.views.obtain_auth_token'),
]
