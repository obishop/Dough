from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render_to_response('index.html')

@login_required
def food(request):
    return render_to_response('food.html')

@login_required
def budget(request):
    return render_to_response('budget.html')

@login_required
def recipes(request):
    return render_to_response('recipes.html')
