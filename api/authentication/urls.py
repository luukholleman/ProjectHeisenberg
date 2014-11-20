from django.conf.urls import include, url
from rest_framework import routers
from api.authentication.views import UserViewSet, AuthenticatedUser

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)

urlpatterns = [
    url('get-authenticated-user$', AuthenticatedUser.as_view()),
    url('login$', 'api.authentication.views.obtain_auth_token'),
    url('', include(router.urls)),
]
