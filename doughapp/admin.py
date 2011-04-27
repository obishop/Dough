from django.contrib import admin
from dough.doughapp.models import FoodItem, Purchase

class FoodItemAdmin(admin.ModelAdmin):
    list_display = ('name','expiration','location','category','purchase','user')

class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('amount','date','user')

admin.site.register(FoodItem,FoodItemAdmin)
admin.site.register(Purchase,PurchaseAdmin)
