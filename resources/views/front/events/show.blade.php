@extends('front.layouts.main')

@push('headers')
<link rel="canonical" href="{{ route('events.show', $event->idSlug()) }}" />
@endpush

@section('content')
    <h2>{{ $event->name }}</h2>
    {{ $event->timespan() }}
    {{ $event->location }}

    @include('front.events.partials.attending', ['attending' => $event->attendedBy(current_user())])

    @include('front.events.partials.schedule')
@endsection