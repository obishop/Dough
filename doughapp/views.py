from django.http import HttpResponse
from django.shortcuts import render_to_response

def index(request):
    return render_to_response('index.html')

def food(request):
    return render_to_response('food.html')

def budget(request):
    return render_to_response('budget.html')

def recipes(request):
    return render_to_response('recipes.html')
