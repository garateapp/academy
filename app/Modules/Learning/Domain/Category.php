<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'icon',
        'sort_order',
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort_order');
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function isParent(): bool
    {
        return $this->children()->exists();
    }

    public function hasParent(): bool
    {
        return $this->parent_id !== null;
    }

    public function getFullPath(): string
    {
        if (!$this->hasParent()) {
            return $this->name;
        }

        return $this->parent->getFullPath() . ' > ' . $this->name;
    }
}
