import Button from "@/app/_components/UpdateButton";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const curCabin = await getBooking(params.id);

  return {
    title: `Edit reservation for booking ${curCabin.id} `,
  };
}

export default async function Page({ params }) {
  const booking = await getBooking(params.id);

  const cabin = await getCabin(booking.cabinId);

  const { maxCapacity } = cabin;

  // CHANGE

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{params.id}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateReservation}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            defaultValue={booking.numGuests}
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="" defaultValue={booking.numGuests}>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>

          <input type="hidden" value={booking.id} name="bookingId" />
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={booking.observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button
            mainTxt="Update Reservation "
            pendingTxt="Updating Reservation..."
          ></Button>
        </div>
      </form>
    </div>
  );
}
