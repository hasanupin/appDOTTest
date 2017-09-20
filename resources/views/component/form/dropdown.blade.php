<div class="form-group">
    {{ Form::label($name, null, ['class' => 'control-label col-md-3']) }}
    <div class="col-md-9">
        {!! Form::select($name, $list_dropdown, $value, array_merge(['class' => 'form-control'] , $attributes)) !!}
    </div>
</div>