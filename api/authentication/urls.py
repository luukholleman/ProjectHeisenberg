from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from api.authentication.views import UserViewSet, AuthenticatedUser, ActivateUser

router = DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet, base_name='api.v1.user')

urlpatterns = [
    url(r'activate', ActivateUser.as_view()),
    url(r'get-authenticated-user$', AuthenticatedUser.as_view(), name='api.v1.get-authenticated-user'),
    url(r'login$', 'api.authentication.views.obtain_auth_token', name='api.v1.login'),
    url(r'', include(router.urls)),
]
