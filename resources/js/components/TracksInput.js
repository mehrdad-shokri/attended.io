import React from 'react';
import useCollection from '../hooks/useCollection';

export default function TracksInput({ initialTracks, errors }) {
    const [tracks, { add, update, remove }] = useCollection(initialTracks);

    return (
        <>
            <button type="button" onClick={() => add({ id: null, name: '', slotCount: 0 })}>
                Add new track
            </button>
            {tracks.map((track, index) => (
                <Track
                    key={index}
                    track={track}
                    index={index}
                    onUpdate={update}
                    onRemove={remove}
                    errors={errors[`tracks.${index}.name`] || []}
                />
            ))}
        </>
    );
}

function Track({ track, index, errors, onUpdate, onRemove }) {
    const canBeRemoved = track.slotCount === 0;

    function updateTrackName(name, index) {
        onUpdate({ ...track, name }, index);
    }

    return (
        <>
            <input type="hidden" name={`tracks[${index}][id]`} value={track.id || ''} />
            <input
                type="text"
                name={`tracks[${index}][name]`}
                value={track.name}
                onChange={event => updateTrackName(event.target.value, index)}
            />
            <em>{track.slotCount} slots</em>
            {canBeRemoved && (
                <button type="button" onClick={() => onRemove(index)}>
                    Remove
                </button>
            )}
            {errors.length && <p>{errors[0]}</p>}
        </>
    );
}
