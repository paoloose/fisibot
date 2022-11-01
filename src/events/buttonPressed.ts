import { CacheType, Events, Interaction } from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import registrationModal from '@components/registration-modal';
import { collections } from '@services/db/mongo';
import RegisteredMember from '@services/db/models/registeredMember';

const buttonPressedHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'registration-button') {
      const findQuery = { discordId: interaction.user.id };
      const registration = await collections.registrations?.findOne<RegisteredMember>(findQuery);

      if (registration) {
        interaction.reply({
          content: 'You are already registered',
          ephemeral: true,
        });
      }
      else interaction.showModal(registrationModal());
    }
  },
};

export default buttonPressedHandler;
