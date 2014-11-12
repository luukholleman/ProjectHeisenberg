from django.shortcuts import render
from django.views.generic.base import TemplateView


class HomepageTemplateView(TemplateView):
    template_name = 'base/home.html'