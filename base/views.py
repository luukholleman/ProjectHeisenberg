from django.shortcuts import render
from django.views.generic.base import TemplateView, RedirectView


class HomepageTemplateView(TemplateView):
    template_name = 'base/home.html'

class RedirectToHomeView(RedirectView):
    url = '/'